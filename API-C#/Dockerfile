#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["WorkFlow.API/WorkFlow.API.csproj", "WorkFlow.API/"]
COPY ["Common.DTO/Common.DTO.csproj", "Common.DTO/"]
COPY ["Common.Functions/Common.Functions.csproj", "Common.Functions/"]
COPY ["WorkFlow.DTO/WorkFlow.DTO.csproj", "WorkFlow.DTO/"]
COPY ["WorkFlow.Domain/WorkFlow.Domain.csproj", "WorkFlow.Domain/"]
COPY ["WorkFlow.Persistence/WorkFlow.Persistence.csproj", "WorkFlow.Persistence/"]
COPY ["WorkFlow.Service/WorkFlow.Service.csproj", "WorkFlow.Service/"]
COPY ["WorkFlow.Application/WorkFlow.Application.csproj", "WorkFlow.Application/"]
COPY ["Common.DataAccess/Common.DataAccess.csproj", "Common.DataAccess/"]
COPY ["Common.Infrastructure/Common.Infrastructure.csproj", "Common.Infrastructure/"]
RUN dotnet restore "WorkFlow.API/WorkFlow.API.csproj"
COPY . .
WORKDIR "/src/WorkFlow.API"
RUN dotnet build "WorkFlow.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WorkFlow.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WorkFlow.API.dll"]