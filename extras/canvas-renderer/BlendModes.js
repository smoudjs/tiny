import { canUseNewCanvasBlendModes } from './utils';

var BlendModes = [];

var modes = Tiny;

BlendModes[modes.NORMAL] = 'source-over';
BlendModes[modes.ADD] = 'lighter'; //IS THIS OK???

var canUse = canUseNewCanvasBlendModes();

BlendModes[modes.MULTIPLY] = canUse ? 'multiply' : 'source-over';
BlendModes[modes.SCREEN] = canUse ? 'screen' : 'source-over';
BlendModes[modes.OVERLAY] = canUse ? 'overlay' : 'source-over';
BlendModes[modes.DARKEN] = canUse ? 'darken' : 'source-over';
BlendModes[modes.LIGHTEN] = canUse ? 'lighten' : 'source-over';
BlendModes[modes.COLOR_DODGE] = canUse ? 'color-dodge' : 'source-over';
BlendModes[modes.COLOR_BURN] = canUse ? 'color-burn' : 'source-over';
BlendModes[modes.HARD_LIGHT] = canUse ? 'hard-light' : 'source-over';
BlendModes[modes.SOFT_LIGHT] = canUse ? 'soft-light' : 'source-over';
BlendModes[modes.DIFFERENCE] = canUse ? 'difference' : 'source-over';
BlendModes[modes.EXCLUSION] = canUse ? 'exclusion' : 'source-over';
BlendModes[modes.HUE] = canUse ? 'hue' : 'source-over';
BlendModes[modes.SATURATION] = canUse ? 'saturation' : 'source-over';
BlendModes[modes.COLOR] = canUse ? 'color' : 'source-over';
BlendModes[modes.LUMINOSITY] = canUse ? 'luminosity' : 'source-over';

export { BlendModes };
