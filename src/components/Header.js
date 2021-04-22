import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, NavBar, theme } from 'galio-framework';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';


const { width } = Dimensions.get('window');


class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  render() {
    const { back, title, scene, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    const headerStyles = [
      styles.shadow ,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];
    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          left={
            <FontAwesomeIcon icon={back ? faChevronLeft : faBars} size={22} onPress={this.handleLeftPress} color={"red"} />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2, marginRight: 10 }}
          titleStyle={[
            styles.title,
            { color: "yellow" },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 19,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 0.5,
    paddingTop: theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: rbTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: rbTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },

});

export default withNavigation(Header);
