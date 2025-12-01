import { Schema, model, models, Document, CallbackError } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true },
        description: { type: String, required: true },
        overview: { type: String, required: true },
        image: { type: String, required: true },
        venue: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        mode: { type: String, required: true },
        audience: { type: String, required: true },
        agenda: { type: [String], required: true },
        organizer: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    { timestamps: true }
);

// Pre-save hook for slug generation and date/time normalization
EventSchema.pre('save', function (next: any) {
    // Generate slug from title if it has been modified or is new
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Normalize date to ISO format
    if (this.isModified('date')) {
        const parsedDate = new Date(this.date);
        if (!isNaN(parsedDate.getTime())) {
            this.date = parsedDate.toISOString();
        }
    }

    // Ensure time is stored consistently (trimmed)
    if (this.isModified('time')) {
        this.time = this.time.trim();
    }

    next();
});

const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
