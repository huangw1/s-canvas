
import Stage from "./core/stage";
import Graphic from "./display/graphic";
import Group from "./display/group";
import Rect from "./display/shapes/rect";
import Circle from "./display/shapes/circle";
import Bitmap from "./display/shapes/bitmap";
import Text from "./display/shapes/text";
import tick from "./core/ticker";
import * as anim from './core/anim';

window.sc = {};
sc.Stage = Stage;
sc.Group = Group;
sc.Graphic = Graphic;
sc.Rect = Rect;
sc.Circle = Circle;
sc.Bitmap = Bitmap;
sc.Text = Text;
sc.tick = tick;
sc.anim = anim;
