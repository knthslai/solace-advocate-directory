import { useAdvocatesContext } from "../contexts/AdvocatesContext";
import {
  TableHeader,
  TableRow,
  SpecialtiesCell,
  LoadingTable,
  PhoneNumberCell,
} from "./AdvocatesTable/";
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineMapPin,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlinePhone,
} from "react-icons/hi2";

type ColumnConfig = {
  key: string;
  header: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
      icon: HiOutlineUser,
      accessor: (advocate) => advocate.firstName,
      minWidth: "120px",
    },
    {
      key: "lastName",
      header: "Last Name",
      icon: HiOutlineUserGroup,
      accessor: (advocate) => advocate.lastName,
      minWidth: "150px",
    },
    {
      key: "city",
      header: "City",
      icon: HiOutlineMapPin,
      accessor: (advocate) => advocate.city,
      minWidth: "120px",
    },
    {
      key: "degree",
      header: "Degree",
      icon: HiOutlineAcademicCap,
      accessor: (advocate) => advocate.degree,
      minWidth: "70px",
    },
    {
      key: "specialties",
      header: "Specialties",
      icon: HiOutlineSparkles,
      accessor: (advocate) => (
        <SpecialtiesCell specialties={advocate.specialties} />
      ),
      minWidth: "200px",
    },
    {
      key: "yearsOfExperience",
      header: "Experience (Yrs)",
      icon: HiOutlineClock,
      accessor: (advocate) => advocate.yearsOfExperience,
      className: "text-center",
      minWidth: "160px",
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
      icon: HiOutlinePhone,
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
            advocates.map((advocate, index) => (
              <TableRow
                key={advocate.id}
                advocate={advocate}
                columns={columns}
                index={index}
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
