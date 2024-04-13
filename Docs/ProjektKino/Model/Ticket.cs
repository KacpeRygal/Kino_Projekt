using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Model
{
    [Table("Ticket")]
    public class Ticket
    {
        [Key, Column("ID")]
        public int ID { get; set; }
        [Column("UserID")]
        public int UserID { get; set; }
        [Column("ScreeningID")]
        public int ScreeningID { get; set; }
        [Column("Price")]
        public double Price { get; set; }
        [Column("Date")]
        public DateTime Date { get; set; }
        [ForeignKey(nameof(UserID))]
        public User User { get; set; }
        [ForeignKey(nameof(ScreeningID))]
        public Screening Screening { get; set; }
        public IEnumerable<Seat> Seats { get; set; }

        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder
            .HasOne(x => x.User)
            .WithMany(x => x.Tickets)
            .OnDelete(DeleteBehavior.Cascade);

            builder
            .HasOne(x => x.Screening)
            .WithMany(x => x.Tickets)
            .OnDelete(DeleteBehavior.Cascade);

            builder
           .HasMany(x => x.Seats)
           .WithOne(x => x.Ticket)
           .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
