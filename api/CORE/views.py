from rest_framework import generics


class BaseView(generics.GenericAPIView):
    lookup_field = "id"


class LCView(BaseView, generics.ListCreateAPIView):
    pass


class RUDView(BaseView, generics.RetrieveUpdateDestroyAPIView):
    pass
