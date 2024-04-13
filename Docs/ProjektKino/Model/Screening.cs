using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("Screening")]
    public class Screening
    {
        [Key, Column("ID")]
        public int ID { get; set; }
        [Column("HallID")]
        public int HallID { get; set; }
        [Column("MovieID")]
        public int MovieID { get; set; }
        [Column("Date")]
        public DateTime Date { get; set; }
        [ForeignKey(nameof(HallID))]
        public Hall Hall { get; set; }
        [ForeignKey(nameof(MovieID))]
        public Movie Movie { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }

        public void Configure(EntityTypeBuilder<Screening> builder)
        {
            builder
            .HasOne(x => x.Hall)
            .WithMany(x => x.Screenings)
            .OnDelete(DeleteBehavior.Cascade);

            builder
            .HasOne(x => x.Movie)
            .WithMany(x => x.Screenings)
            .OnDelete(DeleteBehavior.Cascade);

            builder
            .HasMany(x => x.Tickets)
            .WithOne(x => x.Screening)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
