class ChallengeFinder
	def initialize(params)
		@tag   = params[:tag]
		@order = params[:order_by]
		@name  = params[:q]
	end

	def perform!
		@query = Challenge.includes(:user).all
		with_name
		with_tag
		order_by
	end

	private
	attr_accessor :tag, :order, :name
	
	def with_name
    @query = !name.empty? ? @query.by_name(@name) : @query
	end

	def with_tag
		if tag && !tag.empty?
      formatted_tag = tag.gsub(/-/, ' ')
    	@query = @query.by_tag(formatted_tag)
    else
    	@query = @query
    end
	end

	def order_by
		@query = case order
      when 'latest'  then @query.latest
      when 'oldest'  then @query.oldest
      when 'easiest' then @query.easiest
      when 'hardest' then @query.hardest
      when 'name'    then @query.alphabetical
      else
      	@query
    end
	end
end