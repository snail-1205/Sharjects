import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import type { CustomNextPage } from "src/pages/_app";

interface TimelineItemProps {
  title: string;
  children?: JSX.Element | undefined;
  last?: boolean;
  scroll: (direction: "up" | "down") => void;
}

const TimelineItem: CustomNextPage<TimelineItemProps> = ({
  title,
  children,
  last = false,
  scroll,
}) => (
  <Step expanded last={last} sx={{ padding: "auto 1vw" }}>
    <div>
      {children ? (
        <span
          style={{ color: "themedBlack", fontFamily: "bold", fontSize: 35 }}
          className="has-content"
        >
          {title}
        </span>
      ) : (
        <span style={{ fontSize: 5, color: "#9e9e9e" }}>{title}</span>
      )}
    </div>
    <StepContent>
      {children}
      {children && (
        <span
          onClick={() => scroll("down")}
          style={{
            position: "absolute",
            right: "10px",
            color: "blue",
            margin: "5px",
          }}
        >
          next
        </span>
      )}
    </StepContent>
  </Step>
);

export default TimelineItem;
