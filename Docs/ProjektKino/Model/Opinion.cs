using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("Opinion")]
    public class Opinion
    {
        [Key, Column("ID")]
        public int ID {  get; set; }
        [Column("UserID")]
        public int UserID { get; set; }
        [Column("MovieID")]
        public int MovieID { get; set; }
        [Column("Value")]
        public int Value { get; set; }
        [MaxLength(400), Column("Content")]
        public string Content { get; set; }
        [ForeignKey(nameof(UserID))]
        public User User { get; set; }
        [ForeignKey(nameof(MovieID))]
        public Movie Movie { get; set; }

        public void Configure(EntityTypeBuilder<Opinion> builder)
        {
            builder
            .HasOne(x => x.Movie)
            .WithMany(x => x.Opinions)
            .OnDelete(DeleteBehavior.Cascade);

            builder
            .HasOne(x => x.User)
            .WithMany(x => x.Opinions)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
