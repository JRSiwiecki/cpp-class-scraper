import { List, ListItem, ListItemText } from "@mui/material";

export default function Class({ jsonResponse }) {
  return (
    <div>
      <h2>Recommended Courses</h2>
      <List>
        {jsonResponse.map((course, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${course[0]} - GPA: ${course[1]}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
