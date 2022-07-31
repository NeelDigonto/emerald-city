import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { SceneObject } from "@src/core/SceneGraph";
import { useEngineContext } from "@src/contexts/EngineContext";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import ThreeDRotationRoundedIcon from "@mui/icons-material/ThreeDRotationRounded";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import VideoCameraBackRoundedIcon from "@mui/icons-material/VideoCameraBackRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import * as THREE from "three";
import * as api from "@backend/types/api/Core";
import SidebarListTitle from "../SidebarListTitle";

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  sceneObject: SceneObject;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    sceneObject,
    ...other
  } = props;

  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(labelText);
  const textfieldRef = React.useRef<TextFieldProps>(null);

  /* <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography> */
  return (
    <StyledTreeItemRoot
      /* tabIndex={0}
      onKeyDown={(e) => console.log(e)} */
      sx={{ msOverflow: "auto" }}
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          {!isEditing && (
            <>
              <Typography
                variant="body2"
                sx={{ fontWeight: "inherit", flexGrow: 1 }}
              >
                {labelText}
              </Typography>
              <IconButton
                sx={{ m: 0, p: 0, pr: 2 }}
                onClick={(e) => setIsEditing(true)}
              >
                <DriveFileRenameOutlineRoundedIcon
                  fontSize="small"
                  color="secondary"
                />
              </IconButton>
            </>
          )}
          {isEditing && (
            <>
              <TextField
                inputRef={textfieldRef}
                sx={{ m: 0, p: 0, mr: "0.5rem", input: { color: "darkblue" } }}
                size="small"
                label="Name"
                name="name"
                onChange={(e) => setName(() => e.target.value)}
                value={name}
                /* onKeyPress={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    const name = textfieldRef.current!.value! as string;
                    console.log(name);
                    setName(name);
                    sceneObject.name = name;
                    setIsEditing(false);
                  }
                }} */
              />
              <IconButton
                sx={{ m: 0, p: 0, pr: 2 }}
                onClick={(e) => {
                  sceneObject.name = name;
                  setIsEditing(false);
                }}
              >
                <SaveRoundedIcon fontSize="small" color="secondary" />
              </IconButton>
            </>
          )}
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

const getSceneObjectIcon = (sceneObjectType: api.SceneObjectType) => {
  switch (sceneObjectType) {
    case api.SceneObjectType.Level:
      return MapRoundedIcon;
    case api.SceneObjectType.UnkownMeshObject:
    case api.SceneObjectType.PrimitiveMeshModel:
    case api.SceneObjectType.ImportedMeshModel:
      return ThreeDRotationRoundedIcon;
    case api.SceneObjectType.Light:
      return LightModeRoundedIcon;
    case api.SceneObjectType.Camera:
      return VideoCameraBackRoundedIcon;
    default:
      return QuestionMarkRoundedIcon;
  }
};

export default React.memo(function WorldOutliner() {
  let engine = useEngineContext();
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);
  const [selectedSceneObjectIDs, setSelectedSceneObjectIDs] = React.useState<
    string[]
  >([]);

  const getWorldOutliner = (node: SceneObject) => {
    if (node.childrens.length === 0)
      return (
        <StyledTreeItem
          key={node.id}
          nodeId={node.id}
          sceneObject={node}
          labelText={node.name}
          labelIcon={getSceneObjectIcon(node.type)}
          sx={{ color: node.isSelected ? "red" : "inherit" }}
          color="#a250f5"
          bgColor="#f3e8fd"
          onClick={() => {
            engine.renderEngine?.editorControls!.selectSceneObject(node);
          }}
        ></StyledTreeItem>
      );

    return (
      <StyledTreeItem
        key={node.id}
        sceneObject={node}
        nodeId={node.id}
        labelText={node.name}
        labelIcon={getSceneObjectIcon(node.type)}
      >
        {node.childrens.map((_node, _index) => getWorldOutliner(_node))}
      </StyledTreeItem>
    );
  };

  React.useEffect(() => {
    const callbackID = engine.sceneGraph.registerOnChangeCallback(() => {
      forceUpdate();
    });
    return () => engine.sceneGraph.removeOnChangeCallback(callbackID);
  }, []);

  React.useEffect(() => {
    if (engine.renderEngine === null) return;

    const calbackID =
      engine.renderEngine.editorControls!.registerRaycastCallback(
        (sceneObjects) => {
          //console.log(sceneObjects);
          // maintain priority to be the last one
          // maybe optimize this

          if (sceneObjects && sceneObjects.length !== 0) {
            setSelectedSceneObjectIDs(() =>
              sceneObjects.map((sceneObject) => sceneObject.id)
            );
            /* forceUpdate(); */
          }
        }
      );

    return () => {
      if (engine.renderEngine !== null)
        engine.renderEngine.editorControls!.removeRaycastCallback(calbackID);
    };
  }, [engine.renderEngine]);

  /*   React.useEffect(() => {
    console.log(selectedSceneObjectIDs);
  }, [selectedSceneObjectIDs]); */

  return (
    <Box maxHeight="20rem" overflow="auto">
      <Divider />
      <SidebarListTitle label="World Outliner" />
      <Divider />
      {engine.sceneGraph.root && (
        <TreeView
          aria-label="gmail"
          defaultExpanded={[engine.sceneGraph.root.id]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          multiSelect
          selected={selectedSceneObjectIDs}
          sx={{
            //  height: 264,
            flexGrow: 1,
            //maxWidth: 400,
            pt: "1rem",
            overflowY: "auto",
          }}
        >
          {engine.sceneGraph.root && getWorldOutliner(engine.sceneGraph.root)}
        </TreeView>
      )}
      <Box py="2rem" />
      <Divider />
    </Box>
  );
});

/*           <StyledTreeItem
            nodeId="1"
            labelText="All Mail"
            labelIcon={MailIcon}
          />
          <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
          <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
            <StyledTreeItem
              nodeId="5"
              labelText="Social"
              labelIcon={SupervisorAccountIcon}
              labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
            />
            <StyledTreeItem
              nodeId="6"
              labelText="Updates"
              labelIcon={InfoIcon}
              labelInfo="2,294"
              color="#e3742f"
              bgColor="#fcefe3"
            />
            <StyledTreeItem
              nodeId="7"
              labelText="Forums"
              labelIcon={ForumIcon}
              labelInfo="3,566"
              color="#a250f5"
              bgColor="#f3e8fd"
            />
            <StyledTreeItem
              nodeId="8"
              labelText="Promotions"
              labelIcon={LocalOfferIcon}
              labelInfo="733"
              color="#3c8039"
              bgColor="#e6f4ea"
            />
          </StyledTreeItem>
          <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} /> */
