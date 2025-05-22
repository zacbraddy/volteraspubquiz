import { Spinner } from "~/components/atoms/spinner.tsx";

interface ApplicationTemplateProps {
  heading?: React.ReactNode;
  filter?: React.ReactNode;
  table?: React.ReactNode;
  isLoading?: boolean;
}

const ApplicationTemplate = (props: ApplicationTemplateProps) => {
  const { heading, filter, table, isLoading } = props;

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        padding: "2rem",
      }}
    >
      {heading && (
        <div style={{ textAlign: "center", padding: "0 1rem" }}>{heading}</div>
      )}
      {filter && <div>{filter}</div>}
      {table && <div style={{ padding: "0 2rem" }}>{table}</div>}
    </div>
  );
};

export { ApplicationTemplate };
