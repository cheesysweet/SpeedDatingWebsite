import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { events, meetings, profiles, results } from '../testData.js';


test('test phone number', (t) => {
  assert.equal(profiles[0].PhoneNumber, profiles[1].PhoneNumber);
});

test('profiles not equal', (t) => {
    assert.notEqual(profiles[0], profiles[1]);
});

test('event participants', (t) => {
    assert.deepEqual(events[0].Participants.sort(), events[1].Participants.sort());
})

test('event', (t) => {
    assert.notDeepEqual(events[0], events[1]);
})

test('user event', (t) => {
    assert.deepEqual(profiles[0].Events, [events[0]]);
})

test('meeting', (t) => {
    assert.notDeepEqual(meetings[0], meetings[1]);
})

test('results', (t) => {
    assert.notEqual(results[0], results[1]);
})


test('result in meeting', (t) => {
    assert.notStrictEqual(meetings[0].User1Results, results[0].id);
})