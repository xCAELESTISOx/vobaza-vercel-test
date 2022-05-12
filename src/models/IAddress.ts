export type ElevatorType = 'NONE' | 'PASSENGER' | 'FREIGHT'

export interface IAddress {
    id: number
    address: string
    is_default: boolean
}

export interface IAddressFull extends IAddress {
    entrance: string
    intercom: string
    elevator: ElevatorType
    floor: number
}