using System.Text.Json;

namespace Application.Core
{
    public class AppException
    {
        public int SatausCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

        public AppException(int satausCode, string message, string details = null)
        {
            SatausCode = satausCode;
            Message = message;
            Details = details;
        }

        public override string ToString()
        {
            var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            return JsonSerializer.Serialize(this, options);
        }
    }
}