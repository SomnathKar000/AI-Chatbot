import React from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import withStyles from "@material-ui/core/styles/withStyles";

const defaultChatMsgStyles = ({ palette, spacing }) => {
  const radius = spacing(2.5);
  const size = spacing(4);
  const rightBgColor = palette.primary.main;
  return {
    avatar: {
      width: size,
      height: size,
    },
    leftRow: {
      textAlign: "left",
    },
    rightRow: {
      textAlign: "right",
    },
    msg: {
      padding: spacing(1, 2),
      borderRadius: 4,
      marginBottom: 4,
      display: "inline-block",
      wordBreak: "break-word",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "14px",
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: palette.divider,
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white,
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },
    paper: {
      padding: spacing(1, 2),
      borderRadius: 4,
      marginBottom: 4,
    },
  };
};

const ChatMessage = withStyles(defaultChatMsgStyles, { name: "ChatMsg" })(
  (props) => {
    const {
      classes,
      avatar,
      messages,
      side,
      GridContainerProps,
      GridItemProps,
      AvatarProps,
      getTypographyProps,
    } = props;
    const attachClass = (index) => {
      if (index === 0) {
        return classes[`${side}First`];
      }
      if (index === messages.length - 1) {
        return classes[`${side}Last`];
      }
      return "";
    };
    return (
      <Grid
        container
        spacing={2}
        justifyContent={side === "right" ? "flex-end" : "flex-start"}
        {...GridContainerProps}
      >
        {side === "left" && (
          <Grid item {...GridItemProps}>
            <Avatar
              src={avatar}
              {...AvatarProps}
              className={cx(classes.avatar, AvatarProps.className)}
            />
          </Grid>
        )}
        <Grid item xs={8}>
          {messages.map((msg, i) => {
            const TypographyProps = getTypographyProps(msg, i, props);
            return (
              <div key={msg.id || i} className={classes[`${side}Row`]}>
                <Typography
                  align={"left"}
                  {...TypographyProps}
                  className={cx(
                    classes.msg,
                    classes[side],
                    attachClass(i),
                    TypographyProps.className
                  )}
                >
                  {msg}
                </Typography>
              </div>
            );
          })}
        </Grid>
      </Grid>
    );
  }
);

ChatMessage.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(["left", "right"]),
  GridContainerProps: PropTypes.shape({}),
  GridItemProps: PropTypes.shape({}),
  AvatarProps: PropTypes.shape({}),
  getTypographyProps: PropTypes.func,
};
ChatMessage.defaultProps = {
  avatar: "",
  messages: [],
  side: "left",
  GridContainerProps: {},
  GridItemProps: {},
  AvatarProps: {},
  getTypographyProps: () => ({}),
};

export default ChatMessage;
