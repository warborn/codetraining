module ApplicationHelper
	def js_path(controller_name, action_name)
		"#{Rails.root}/app/views/#{controller_name.to_s}/js/#{action_name.to_s}.js"
	end

	def devicon_svg(name)
		file_path = "#{Rails.root}/node_modules/devicon-2.2/icons/#{name}/#{name}-original.svg"
		puts "************#{file_path}**************"
		return File.read(file_path).html_safe if File.exists?(file_path)
  	'(not found)'
	end
end
