import Tree from './tree.js';
import Container from './container.js';

import {random} from '../utils/utils.js';


const H_RATIO = 0.45;
const W_RATIO = 0.45;
const DISCARD_BY_RATIO = true;


export function split_container(container, iter) {
    var root = new Tree(container);
    if (iter != 0) {
        var sr = random_split(container);
        root.lchild = split_container(sr[0], iter - 1);
        root.rchild = split_container(sr[1], iter - 1);
    }
    return root;
}

export function random_split(container) {
    var r1, r2;
    if (random(0, 1) == 0) {
        r1 = new Container(container.x, container.y,
            random(1, container.w), container.h
        )
        r2 = new Container(
            container.x + r1.w, container.y,
            container.w - r1.w, container.h
        )

        if (DISCARD_BY_RATIO) {
            var r1_w_ration = r1.w / r1.h;
            var r2_w_ration = r2.w / r2.h;

            if (r1_w_ration < W_RATIO || r2_w_ration < W_RATIO) {
                return random_split(container);
            }
        }

    } else {
        // Horizontal
        r1 = new Container(
            container.x, container.y,
            container.w, random(1, container.h)
        );
        r2 = new Container(
            container.x, container.y + r1.h,
            container.w, container.h - r1.h
        )

        if (DISCARD_BY_RATIO) {
            var r1_h_ratio = r1.h / r1.w;
            var r2_h_ratio = r2.h / r2.w;
            if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
                return random_split(container);
            }
        }
    }
    return [r1, r2]
}

export function draw_paths(ctx, tree) {
    if (tree.lchild == undefined || tree.rchild == undefined) {
        return;
    }

    tree.lchild.leaf.drawPath(ctx, tree.rchild.leaf);
    draw_paths(ctx, tree.lchild);
    draw_paths(ctx, tree.rchild);
}
