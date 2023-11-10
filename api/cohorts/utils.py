from datetime import timedelta, date
from courses.models import CourseModuleDrip
from tracks.models import TrackCourseDrip


def get_next_drip(date: date, module_days_needed, total_days, days_per_week):
    total_days += module_days_needed

    while total_days >= 1:
        date += timedelta(days=1)

        if days_per_week == 7 or date.weekday() not in [5, 6]:
            total_days -= 1

    return date, total_days


def calculate_drip_schedule(cohort):
    pace = cohort.pace
    next_date = cohort.start_date
    total_days = 0

    for track_course in cohort.track.courses.all():
        course = track_course.course
        tc_drip = TrackCourseDrip.objects.filter(cohort=cohort, track_course=track_course).first()
        if tc_drip is None or not tc_drip.override:
            TrackCourseDrip.objects.update_or_create(
                cohort=cohort, track_course=track_course, defaults={"date": next_date}
            )

        for course_module in course.modules.all():
            cm_drip = CourseModuleDrip.objects.filter(cohort=cohort, course_module=course_module).first()
            if cm_drip is None or not cm_drip.override:
                CourseModuleDrip.objects.update_or_create(
                    cohort=cohort, course_module=course_module, defaults={"date": next_date}
                )

            module_hours = course_module.module.course_hours
            module_days_needed = (module_hours / pace.hours_per_week) * pace.days_per_week
            next_date, total_days = get_next_drip(next_date, module_days_needed, total_days, pace.days_per_week)
