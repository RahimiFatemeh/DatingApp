using API.Helper ;
using Microsoft.AspNetCore.Http ; 
using System.Text.Json; 

namespace API.Extension
{
    public static class HttpExtension
    {
        public static void AddPaginationHeader(this HttpResponse response , int currentPage , 
            int itemPerPage , int totalItems , int totalPages)
            {
                var PaginationHeader = new PaginationHeader(currentPage,itemPerPage,totalItems,totalPages);

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                response.Headers.Add("Pagination" , JsonSerializer.Serialize(PaginationHeader , options));

                response.Headers.Add("Access-Control-Expose-Headers" , "Pagination");
            }
        
    } 
}