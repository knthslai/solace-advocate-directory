import { useAdvocatesContext } from "../contexts/AdvocatesContext";
import {
  TableHeader,
  TableRow,
  SpecialtiesCell,
  LoadingTable,
  PhoneNumberCell,
} from "./AdvocatesTable/";

type ColumnConfig = {
  key: string;
  header: string;
  accessor: (advocate: any) => React.ReactNode;
  className?: string;
  minWidth?: string;
};

export default function AdvocatesTable() {
  const { advocates, isLoading, searchTerm } = useAdvocatesContext();

  const columns: ColumnConfig[] = [
    {
      key: "firstName",
      header: "First Name",
      accessor: (advocate) => advocate.firstName,
      minWidth: "120px",
    },
    {
      key: "lastName",
      header: "Last Name",
      accessor: (advocate) => advocate.lastName,
      minWidth: "150px",
    },
    {
      key: "city",
      header: "City",
      accessor: (advocate) => advocate.city,
      minWidth: "120px",
    },
    {
      key: "degree",
      header: "Degree",
      accessor: (advocate) => advocate.degree,
      minWidth: "70px",
    },
    {
      key: "specialties",
      header: "Specialties",
      accessor: (advocate) => (
        <SpecialtiesCell specialties={advocate.specialties} />
      ),
      minWidth: "200px",
    },
    {
      key: "yearsOfExperience",
      header: "Years of Experience",
      accessor: (advocate) => advocate.yearsOfExperience,
      className: "text-center",
      minWidth: "100px",
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
      accessor: (advocate) => (
        <PhoneNumberCell phoneNumber={advocate.phoneNumber} />
      ),
      minWidth: "160px",
    },
  ];
  return (
    <div className="overflow-auto border border-secondary-300 rounded-lg h-full">
      <table className="w-full h-full border-collapse ">
        <TableHeader columns={columns} />
        <tbody>
          {advocates && advocates.length > 0 ? (
            advocates.map((advocate) => (
              <TableRow
                key={advocate.id}
                advocate={advocate}
                columns={columns}
              />
            ))
          ) : (
            <LoadingTable
              isLoading={isLoading}
              searchTerm={searchTerm}
              columnsCount={columns.length}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
