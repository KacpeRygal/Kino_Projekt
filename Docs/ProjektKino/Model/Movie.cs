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
    [Table("Movie")]
    public class Movie
    {
        [Key, Column("ID")]
        public int ID { get; set; }
       // [Column("ScreeningID")]
       // public int ScreeningID { get; set; }
        [Column("Time")]
        public DateTime Time { get; set; }
        [MaxLength(60),Column("Language")]
        public string Language { get; set; }
        [Column("Score")]
        public int Score { get; set; }
        [MaxLength(60), Column("Name")]
        public string Name { get; set; }
        public IEnumerable<Opinion> Opinions { get; set; }
       // [ForeignKey(nameof(ScreeningID))]                 //Blad w schemacie Encji
        public IEnumerable<Screening> Screenings { get; set; }

        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder
            .HasMany(x => x.Screenings)
            .WithOne(x => x.Movie)
            .OnDelete(DeleteBehavior.Cascade);

            builder
            .HasMany(x => x.Opinions)
            .WithOne(x => x.Movie)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
