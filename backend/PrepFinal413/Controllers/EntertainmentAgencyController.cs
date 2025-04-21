using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrepFinal413.Models;

namespace PrepFinal413.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainmentAgencyController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;

        public EntertainmentAgencyController(EntertainmentAgencyExampleContext context)
        {
            _context = context;
        }

        // GET: All Entertainers (paginated)
        [HttpGet("Entertainers")]
        public IActionResult GetEntertainers(int pageSize = 10, int pageNum = 1)
        {
            var total = _context.Entertainers.Count();

            var entertainers = _context.Entertainers
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { Entertainers = entertainers, Total = total });
        }

        // GET: Entertainer Stats
        [HttpGet("EntertainerStats")]
        public IActionResult GetEntertainerStats()
        {
            var stats = _context.Entertainers
                .Select(e => new
                {
                    e.EntertainerId,
                    e.EntStageName,
                    Bookings = _context.Engagements.Count(en => en.EntertainerId == e.EntertainerId),
                    LastBooking = _context.Engagements
                        .Where(en => en.EntertainerId == e.EntertainerId)
                        // I decided the last booking based on the most recent end date
                        .OrderByDescending(en => en.EndDate)
                        .Select(en => en.EndDate)
                        .FirstOrDefault()
                }).ToList();

            return Ok(stats);
        }

        // GET: Entertainer Details
        [HttpGet("EntertainerDetails/{id}")]
        public IActionResult GetEntertainerDetails(int id)
        {
            var entertainer = _context.Entertainers.Find(id);
            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            return Ok(entertainer);
        }

        // POST: Add Entertainer
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            _context.Entertainers.Add(newEntertainer);
            _context.SaveChanges();
            return Ok(newEntertainer);
        }

        // PUT: Update Entertainer
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            var existing = _context.Entertainers.Find(id);
            if (existing == null) return NotFound();

            existing.EntStageName = updated.EntStageName;
            existing.EntSsn = updated.EntSsn;
            existing.EntStreetAddress = updated.EntStreetAddress;
            existing.EntCity = updated.EntCity;
            existing.EntState = updated.EntState;
            existing.EntZipCode = updated.EntZipCode;
            existing.EntPhoneNumber = updated.EntPhoneNumber;
            existing.EntWebPage = updated.EntWebPage;
            existing.EntEmailAddress = updated.EntEmailAddress;
            existing.DateEntered = updated.DateEntered;

            _context.Entertainers.Update(existing);
            _context.SaveChanges();

            return Ok(existing);
        }

        // DELETE: Entertainer
        [HttpDelete("DeleteEntertainer/{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var entertainer = _context.Entertainers.Find(id);
            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();

            return NoContent();
        }

        // GET: All Engagements (optional, for debugging or UI)
        [HttpGet("Engagements")]
        public IActionResult GetEngagements()
        {
            var engagements = _context.Engagements.ToList();
            return Ok(engagements);
        }
    }
}
