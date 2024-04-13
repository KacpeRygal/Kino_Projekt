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
    [Table("User")]
    public class User
    {
        [Key, Column("ID")]
        public int ID { get; set; }
        [MaxLength(50),Column("Login")]
        public string Login { get; set; }
        [MaxLength(50), Column("Password")]
        public string Password { get; set; }
        [Column("Type")]
        public UserTypeEnum Type { get; set; }
        [MaxLength(50), Column("Name")]
        public string Name { get; set; }
        [Column("CanReduce")]
        public bool CanReduce { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }
        public IEnumerable<Opinion> Opinions { get; set; }
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
            .HasMany(x => x.Opinions)
            .WithOne(x => x.User)
            .OnDelete(DeleteBehavior.Cascade);

            builder
           .HasMany(x => x.Tickets)
           .WithOne(x => x.User)
           .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public enum UserTypeEnum
    {
        Admin,
        User,
        Reviewer
    }
}
