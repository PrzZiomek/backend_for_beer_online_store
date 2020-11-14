import { RowDataPacket, OkPacket } from 'mysql2';

type RowDataPacketTuple = RowDataPacket[] | RowDataPacket[][];
type OkPacketTuple = OkPacket | OkPacket[];

export type RowDataOrOkPacketTuple = RowDataPacketTuple | OkPacketTuple;