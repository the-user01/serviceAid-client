
const TeamMembers = () => {

    const teamMembers = [
        { name: 'John Doe', role: 'CEO & Founder', image: '/placeholder.svg?height=300&width=300' },
        { name: 'Jane Smith', role: 'COO', image: '/placeholder.svg?height=300&width=300' },
        { name: 'Mike Johnson', role: 'CTO', image: '/placeholder.svg?height=300&width=300' },
        { name: 'Sarah Brown', role: 'Head of Customer Service', image: '/placeholder.svg?height=300&width=300' },
    ]

    return (
        <div>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-semibold mb-12 text-center">Meet Our Team</h3>
                    <div className="grid md:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-xl" />
                                <h4 className="text-xl font-semibold">{member.name}</h4>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamMembers;