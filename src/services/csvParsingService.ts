interface ParsedCSVRow {
  Id: string;
  AmenityId?: string;
  UserId?: string;
  StartTime?: string;
  EndTime?: string;
  Date?: string;
  Name?: string;
}

export const parseCSV = (csvBuffer: Buffer): ParsedCSVRow[] => {
  const results: ParsedCSVRow[] = [];
  let headers;

  csvBuffer
    .toString()
    .split('\n')
    .forEach((line, index) => {
      if (index === 0) {
        headers = line.split(',').map((value) => value.trim());
        if (headers.length === 2 && headers.includes('Id') && headers.includes('Name')) {
          return;
        } else if (headers.length === 6 && headers.includes('Id') && headers.includes('Amenity id')
        && headers.includes('User id') && headers.includes('Start time') && headers.includes('End time') && headers.includes('Date')) {
          return;
        }
      }

      // Data row, parse accordingly
      const data = line.split(',').map((value) => value.trim());
      if (headers.length === 2) {
        results.push({
          Id: data[0],
          Name: data[1],
        });
      } else if (headers.length === 6) {
        results.push({
          Id: data[0],
          AmenityId: data[1],
          UserId: data[2],
          StartTime: data[3],
          EndTime: data[4],
          Date: data[5],
        });
      }
    });

  return results;
};
