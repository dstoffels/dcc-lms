from rest_framework import generics


class BaseView(generics.GenericAPIView):
    lookup_field = "id"
    parent_kwarg = ""
    Model = None

    def get_queryset(self):
        filter_kwargs = {self.parent_kwarg: self.kwargs.get(self.parent_kwarg)}
        if self.parent_kwarg:
            return self.Model.objects.filter(**filter_kwargs)
        return super().get_queryset()

    def get_serializer_context(self):
        if self.parent_kwarg:
            return {"parent_id": self.kwargs.get(self.parent_kwarg), "parent_kwarg": self.parent_kwarg}
        return super().get_serializer_context()


class LCView(BaseView, generics.ListCreateAPIView):
    pass


class RUDView(BaseView, generics.RetrieveUpdateDestroyAPIView):
    pass
