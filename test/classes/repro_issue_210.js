'use strict';

import { expect } from 'chai';
import Flatten from '../../index';
import { Box, Segment, Point } from '../../index';

// Regression test for issue #210
// Box.distanceTo(shape) maps each of the box's 4 edges to Segment.distanceTo(shape),
// but Segment.distanceTo had no Box branch, so passing a Box returned undefined and
// Box.distanceTo(Box) crashed with "Cannot read properties of undefined (reading '0')".
describe('#Flatten.Box.distanceTo(Box) (issue #210)', function () {
    it('does not throw and returns 0 for overlapping boxes (reporter coordinates)', function () {
        const a = new Box(11.997102737426758, 6.649463176727295, 13.695880889892578, 7.980637073516846);
        const b = new Box(13.374691009521484, 6.007083415985107, 15.073468208312988, 7.338257312774658);
        const [dist] = a.distanceTo(b);
        expect(dist).to.equal(0);
    });
    it('returns the boundary gap for disjoint boxes', function () {
        const a = new Box(0, 0, 1, 1);
        const b = new Box(3, 0, 4, 1);
        const [dist] = a.distanceTo(b);
        expect(dist).to.equal(2);
    });
    it('Segment.distanceTo(Box) returns the boundary gap and shortest segment', function () {
        const segment = new Segment(new Point(-2, 0.5), new Point(-1, 0.5));
        const box = new Box(0, 0, 1, 1);
        const [dist, shortest_segment] = segment.distanceTo(box);
        expect(dist).to.equal(1);
        expect(shortest_segment.ps).to.deep.include({ x: -1, y: 0.5 });
        expect(shortest_segment.pe).to.deep.include({ x: 0, y: 0.5 });
    });
});
