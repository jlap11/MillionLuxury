FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MillionLuxury.API/MillionLuxury.API.csproj", "MillionLuxury.API/"]
COPY ["MillionLuxury.Application/MillionLuxury.Application.csproj", "MillionLuxury.Application/"]
COPY ["MillionLuxury.Domain/MillionLuxury.Domain.csproj", "MillionLuxury.Domain/"]
COPY ["MillionLuxury.Infrastructure/MillionLuxury.Infrastructure.csproj", "MillionLuxury.Infrastructure/"]
RUN dotnet restore "MillionLuxury.API/MillionLuxury.API.csproj"

COPY . .
WORKDIR "/src/MillionLuxury.API"
RUN dotnet build "MillionLuxury.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MillionLuxury.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MillionLuxury.API.dll"]
