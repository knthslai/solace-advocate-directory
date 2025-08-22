"use client";

import { useState } from "react";
import { useAdvocates, useAllAdvocates, useDebounce } from "../hooks";
import { SearchInput, Button } from "../components";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  // Use debounce for the search term
  useDebounce(searchTerm, setDebouncedSearchTerm, 300);

  // Use TanStack Query hooks
  const {
    data: allAdvocates = [],
    isLoading: allAdvocatesLoading,
    error: allAdvocatesError,
  } = useAllAdvocates();

  const {
    data: searchResults = [],
    isLoading: searchLoading,
    error: searchError,
  } = useAdvocates(debouncedSearchTerm || undefined);

  // Determine which data to show and loading state
  const isSearching = Boolean(debouncedSearchTerm);
  const advocates = isSearching ? searchResults : allAdvocates;
  const isLoading = isSearching ? searchLoading : allAdvocatesLoading;
  const error = isSearching ? searchError : allAdvocatesError;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    setSearchTerm("");
  };

  if (error) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <div style={{ color: "red", padding: "20px" }}>
          Error loading advocates. Please try again.
        </div>
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div suppressHydrationWarning={true}>
        <p>Search</p>
        {searchTerm && (
          <p>
            Searching for:{" "}
            <span style={{ fontWeight: "bold" }}>{searchTerm}</span>
            {isLoading && (
              <span
                style={{
                  marginLeft: "10px",
                  color: "#0066cc",
                  fontStyle: "italic",
                }}
              >
                🔍 Searching...
              </span>
            )}
          </p>
        )}
        {!searchTerm && advocates.length > 0 && (
          <p style={{ color: "#666" }}>
            Showing all {advocates.length} advocates
          </p>
        )}
        {searchTerm && advocates.length > 0 && !isLoading && (
          <p style={{ color: "#0066cc" }}>
            Found {advocates.length} advocate
            {advocates.length !== 1 ? "s" : ""} matching &ldquo;
            {searchTerm}&rdquo;
          </p>
        )}
        <SearchInput
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onChange}
        />
        <Button onClick={onClick}>Reset Search</Button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates && advocates.length > 0 ? (
            advocates.map((advocate) => {
              // Parse specialties from JSON string if needed
              let specialties: string[] = [];
              if (typeof advocate.specialties === "string") {
                try {
                  specialties = JSON.parse(advocate.specialties);
                } catch (e) {
                  specialties = [];
                }
              } else if (Array.isArray(advocate.specialties)) {
                specialties = advocate.specialties;
              }

              return (
                <tr key={advocate.id}>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    {specialties.map((s: string) => (
                      <div key={s}>{s}</div>
                    ))}
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                {isLoading ? (
                  <span style={{ color: "#0066cc" }}>
                    🔍 Searching for advocates...
                  </span>
                ) : searchTerm ? (
                  <span style={{ color: "#888" }}>
                    No advocates found matching &ldquo;{searchTerm}&rdquo;
                  </span>
                ) : (
                  "No advocates found"
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
