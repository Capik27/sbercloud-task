import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
	"label + &": {
		marginTop: theme.spacing(0),
	},
	"& .MuiInputBase-input": {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		fontSize: 14,
		padding: "10px 26px 10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		fontFamily: ["SB Sans Interface"],
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
}));
