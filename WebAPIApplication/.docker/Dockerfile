FROM microsoft/dotnet:latest
WORKDIR /app
COPY bin/Debug/netcoreapp1.1/publish /app
ENV ASPNETCORE_URLS http://*:80
EXPOSE 80
ENTRYPOINT ["dotnet", "WebAPIApplication.dll"]