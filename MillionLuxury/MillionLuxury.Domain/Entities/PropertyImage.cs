using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MillionLuxury.Domain.Entities;

public class PropertyImage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdPropertyImage { get; set; } = ObjectId.GenerateNewId().ToString();
    
    [BsonElement("idProperty")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdProperty { get; set; } = string.Empty;
    
    [BsonElement("file")]
    public string File { get; set; } = string.Empty;
    
    [BsonElement("enabled")]
    public bool Enabled { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
