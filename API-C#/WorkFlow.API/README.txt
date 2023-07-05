dotnet restore --Rodar antes de qualquer comando scaffold
Microsoft.NETCore.App
Microsoft.EntityFrameworkCore.Tools
Microsoft.EntityFrameworkCore.Design


Para criar migration:
dotnet ef migrations add CreateDoctorPacient -p WorkFlow.Persistence -s WorkFlow.API -c WorkFlowContext --verbose