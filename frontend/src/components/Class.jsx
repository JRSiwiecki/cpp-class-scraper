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
  marginLeft: "20px",
};

export default function Class({ jsonResponse }) {
  return (
    <section>
      <List>
        {jsonResponse.map((course, index) => (
          <ListItem key={index} style={listItemStyle}>
            <div style={courseNameStyle}>
              <ListItemText primary={course[0]} />
              <em>
                <ListItemText primary={course[1]} />
              </em>
            </div>
            <div style={gpaStyle}>Average GPA: {course[2].toFixed(2)}</div>
          </ListItem>
        ))}
      </List>
    </section>
  );
}
