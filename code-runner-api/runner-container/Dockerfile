FROM debian:buster-slim

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    apt-transport-https

RUN apt-get install -y python3 python3-pip

RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install nodejs -y

RUN apt-get install -y openjdk-11-jre openjdk-11-jdk

RUN curl -sSL https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb -o packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb
RUN apt-get update && apt-get install -y dotnet-sdk-3.1

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* packages-microsoft-prod.deb

WORKDIR /app

RUN dotnet new console -n template

