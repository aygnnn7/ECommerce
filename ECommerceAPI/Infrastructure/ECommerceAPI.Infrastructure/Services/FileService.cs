using ECommerceAPI.Infrastructure.Operations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceAPI.Infrastructure.Services
{
    public class FileService
    {
        private async Task<string> FileRenameAsync(string path, string fileName, bool first = true)
        {
            string newFileName = await Task.Run(async () =>
            {
                string extension = Path.GetExtension(fileName);
                string newFileName;
                if (first)
                {
                    string oldName = Path.GetFileNameWithoutExtension(fileName);
                    newFileName = $"{NameOperation.CharacterRegulatory(oldName)}{extension}";
                }
                else
                {
                    newFileName = fileName;
                    int indexNo1 = newFileName.IndexOf('-');
                    if(indexNo1 == -1)
                    {
                        newFileName = $"{Path.GetFileNameWithoutExtension(newFileName)}-2{extension}";
                    }
                    else
                    {
                        int indexNo2 = newFileName.IndexOf(".");
                        int fileNumberStartIndex = indexNo1 + 1;
                        int fileNumberLength = indexNo2 - indexNo1 - 1;

                        string fileNo = newFileName.Substring(fileNumberStartIndex, fileNumberLength);
                        int _fileNo = int.Parse(fileNo);
                        _fileNo++;

                        newFileName = newFileName.Remove(fileNumberStartIndex, fileNumberLength)
                                                .Insert(fileNumberStartIndex, _fileNo.ToString());
                    }
                }

                

                if (File.Exists($"{path}\\{newFileName}"))
                    return await FileRenameAsync(path, newFileName, false);
                else
                    return newFileName;
            });

            return newFileName;
        }
    }
}
