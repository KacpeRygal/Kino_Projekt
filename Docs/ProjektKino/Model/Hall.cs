using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("Halls")]
    public class Hall
    {
        [Key,Column("ID")]
        public int ID { get; set; }
        [Column("Rows")]
        public int Rows { get; set; }
        [Column("Columns")]
        public int Columns { get; set; }
        [Column("Full")]
        public bool Full { get; set; }
        public HallTechnologyEnum Technology { get; set; }
        public IEnumerable<Screening>? Screenings { get; set; }
        public IEnumerable<Seat> Seats { get; set; }

        public void Configure(EntityTypeBuilder<Hall> builder)
        {
            builder
            .HasMany(x => x.Seats)
            .WithOne(x => x.Hall)
            .OnDelete(DeleteBehavior.Cascade);
            
            builder
            .HasMany(x => x.Screenings)
            .WithOne(x => x.Hall)
            .OnDelete(DeleteBehavior.Cascade); 
        }

    }
    public enum HallTechnologyEnum
    {
        IMAX,
        ScreenX,
        HDR,
        HFR
    }
}
