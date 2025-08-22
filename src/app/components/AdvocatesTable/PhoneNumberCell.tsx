interface PhoneNumberCellProps {
  phoneNumber: string | number | null | undefined;
}

export default function PhoneNumberCell({ phoneNumber }: PhoneNumberCellProps) {
  const formatPhoneNumber = (
    phone: string | number | null | undefined
  ): string => {
    // Handle null, undefined values
    if (phone == null) {
      return "";
    }

    // Convert to string if it's a number
    const phoneStr = String(phone);

    // Remove all non-numeric characters
    const cleaned = phoneStr.replace(/\D/g, "");

    // Check if it's a valid US phone number (10 digits)
    if (cleaned.length === 10) {
      // Format as (XXX) XXX-XXXX
      return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6)}`;
    }

    // Check if it's 11 digits with country code
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      // Format as +1 (XXX) XXX-XXXX
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(
        4,
        7
      )}-${cleaned.slice(7)}`;
    }

    // Return original if it doesn't match expected patterns
    return phoneStr;
  };

  return <span>{formatPhoneNumber(phoneNumber)}</span>;
}
