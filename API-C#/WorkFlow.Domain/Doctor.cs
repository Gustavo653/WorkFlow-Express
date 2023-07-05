﻿using KeepHealth.Domain.Identity;

namespace KeepHealth.Domain
{
    public class Doctor : BaseEntity
    {
        public List<MedicalSpeciality> MedicalSpecialities { get; set; }
        public double AppointmentPrice { get; set; }
        public User User { get; set; }
        public bool Approved { get; set; }
    }
}
