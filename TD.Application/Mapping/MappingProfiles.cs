using AutoMapper;
using TD.Domain.Entities;
using TD.Domain.SlimEntities;

namespace TD.Application.Mapping;

public class MappingProfiles: Profile
{
    public MappingProfiles()
    {
        CreateMap<ToDoTask, SlimToDoTask>();
    }
}
