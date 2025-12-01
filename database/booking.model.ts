import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address',
            ],
        },
    },
    { timestamps: true }
);

// Pre-save hook to validate event existence
BookingSchema.pre('save', async function () {
    if (this.isModified('eventId')) {
        // Check if the referenced event exists
        // We use the imported Event model to ensure it's registered
        const event = await Event.findById(this.eventId);

        if (!event) {
            throw new Error('Event not found');
        }
    }
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
