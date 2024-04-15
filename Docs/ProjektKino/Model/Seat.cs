using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("Seat")]
    public class Seat
    {
        [Key, Column("ID")]
        public int ID {  get; set; }
        [Column("TicketID")]
        public int TicketID { get; set; }
        [Column("HallID")]
        public int HallID { get; set; }
        [Column("Row")]
        public int Row {  get; set; }
        [Column("Column")]
        public int Column { get; set; }
        [Column("Occupied")]
        public bool Occupied { get; set; }
        [ForeignKey(nameof(HallID))]
        public Hall Hall { get; set; }
        [ForeignKey(nameof(TicketID))]
        public Ticket ?Ticket { get; set; }

        public void Configure(EntityTypeBuilder<Seat> builder)
        {
            builder
            .HasOne(x => x.Hall)
            .WithMany(x => x.Seats)
            .OnDelete(DeleteBehavior.Cascade);

            builder
            .HasOne(x => x.Ticket)
            .WithMany(x => x.Seats)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
