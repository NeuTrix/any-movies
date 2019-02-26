// Customized material-ui theme
import { createMuiTheme } from '@material-ui/core/styles';
//  Color Palette (MUI)
import lightBlue from '@material-ui/core/colors/lightBlue';
import lightGreen from '@material-ui/core/colors/lightGreen';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';

const shadeLight = '50'; // set common shadeMain for color palette
const shadeMain = '500'; // set common shadeMain for color palette

const options = {
	palette: {
		primary: {
			contrastText: grey[shadeLight],
			light: lightBlue[shadeLight],
			main: lightBlue[shadeMain],
		},

		secondary: {
			main: lightGreen.A400,
		},

		tertiary: {
			main: pink[shadeMain],
		},
	},

	sizes: {
		drawerWidth: 264,
	},

	status: {
		danger: pink,
	},

	typography: {
		useNextVariants: true,
	},
};

const masterTheme = createMuiTheme(options);

export default masterTheme;
