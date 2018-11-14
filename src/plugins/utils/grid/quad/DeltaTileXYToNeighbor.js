// Not included in Base Gird object.
// Delta tileXY to direction

import {
    OrthogonalMap,
    StaggeredMap
} from './NeighborToDeltaTileXY.js';

var ReverseDirMap = function (dirMap) {
    var out = {},
        entry, x, y;
    for (var dir in dirMap) {
        entry = dirMap[dir]; // [x, y]
        x = entry[0];
        y = entry[1];
        if (!out.hasOwnProperty(x)) {
            out[x] = {}
        }
        out[x][y] = dir;
    }
    return out;
}

const OrthogonalMapOut = ReverseDirMap(OrthogonalMap);
const IsometricMapOut = OrthogonalMapOut;
const StaggeredMapOut = [
    ReverseDirMap(StaggeredMap[0]),
    ReverseDirMap(StaggeredMap[1])
];

export {
    OrthogonalMapOut as OrthogonalMap,
    IsometricMapOut as IsometricMap,
    StaggeredMapOut as StaggeredMap
};