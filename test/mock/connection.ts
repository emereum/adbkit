import Connection from '../../src/adb/connection';
import Parser from '../../src/adb/parser';
import MockDuplex from './duplex';
import MockClient from './client';

export default class MockConnection extends Connection {
    _socket = new MockDuplex();

    constructor() {
        super(new MockClient());
        this.parser = new Parser(this._socket);
    }

    public getSocket(): MockDuplex {
        return this._socket;
    }

    public end(): this {
        this._socket.causeEnd();
        return this;
    }

    public write(chunk: string | Uint8Array): Promise<number> {
        return new Promise((accept, reject) => {
            this._socket.write(chunk, (err) => {
                if (err) reject(err);
                else accept(chunk.length);
            });
        })
    }

    // @ts-ignore
    public on(): this {
        return this;
    }
}
