interface SpecialtiesCellProps {
  specialties: string | string[];
}

export default function SpecialtiesCell({ specialties }: SpecialtiesCellProps) {
  // Parse specialties from JSON string if needed
  let parsedSpecialties: string[] = [];

  if (typeof specialties === "string") {
    try {
      parsedSpecialties = JSON.parse(specialties);
    } catch (e) {
      parsedSpecialties = [];
    }
  } else if (Array.isArray(specialties)) {
    parsedSpecialties = specialties;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {parsedSpecialties.map((specialty: string, idx: number) => (
        <span
          key={idx}
          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200 whitespace-nowrap"
        >
          {specialty}
        </span>
      ))}
    </div>
  );
}
