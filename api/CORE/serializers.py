from rest_framework import serializers


class BaseSerializer(serializers.ModelSerializer):
    def is_valid(self, *, raise_exception=True):
        return super().is_valid(raise_exception=raise_exception)

    def validate(self, data):
        parent_key = self.context.get("parent_kwarg")
        parent_id = self.context.get("parent_id")

        if parent_key:
            data[parent_key] = parent_id

        return super().validate(data)
