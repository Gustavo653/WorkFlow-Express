﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO
{
    public class CreatePatientDTO : UserDTO
    {
        public List<long>? MedicalConditions { get; set; }
    }
}
