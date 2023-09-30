using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TD.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class createdatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ToDoTask",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    IsDone = table.Column<bool>(type: "INTEGER", nullable: false),
                    Deleted = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    DueDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    CreationDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    ModificationDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoTask", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ToDoTask");
        }
    }
}
