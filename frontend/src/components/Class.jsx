import { List, ListItem, ListItemText } from "@mui/material";

const listItemStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "1px solid #ccc",
  padding: "8px 16px",
};

const courseNameStyle = {
  flex: 1,
};

const gpaStyle = {
  marginLeft: "16px",
};

export default function Class({ jsonResponse }) {
  return (
    <div>
      <List>
        {jsonResponse.map((course, index) => (
          <ListItem key={index} style={listItemStyle}>
            <div style={courseNameStyle}>
              <ListItemText primary={course[0]} />
              <ListItemText primary={course[1]} />
            </div>
            <div style={gpaStyle}>GPA: {course[2]}</div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
